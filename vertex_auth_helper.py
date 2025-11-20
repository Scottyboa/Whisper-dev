# File: vertex_auth_helper.py
#
# Local helper that runs on the user's computer and hands out
# short-lived access tokens for Vertex AI (scope: cloud-platform).
#
# Requirements:
#   pip install google-auth requests
#
# Usage:
#   1. Put your service account JSON key as "service_account.json"
#      in the same folder as this script, OR set
#      GOOGLE_APPLICATION_CREDENTIALS to its path.
#   2. Run:  python vertex_auth_helper.py
#   3. Keep it running while you use the web app.
#
# The frontend calls: http://127.0.0.1:9999/getToken

import json
import os
from http.server import BaseHTTPRequestHandler, HTTPServer

from google.oauth2 import service_account
from google.auth.transport.requests import Request

PORT = 9999
SCOPES = ["https://www.googleapis.com/auth/cloud-platform"]


def build_credentials():
    # Try env var first, then default file name
    creds_path = os.environ.get("GOOGLE_APPLICATION_CREDENTIALS", "service_account.json")
    if not os.path.isfile(creds_path):
        raise FileNotFoundError(
            f"Service account file not found: {creds_path}\n"
            "Put your service account JSON key as 'service_account.json' next to this script,\n"
            "or set the GOOGLE_APPLICATION_CREDENTIALS environment variable."
        )

    creds = service_account.Credentials.from_service_account_file(
        creds_path, scopes=SCOPES
    )
    return creds


class TokenHandler(BaseHTTPRequestHandler):
    def _send_cors_headers(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")

    def do_OPTIONS(self):
        self.send_response(204)
        self._send_cors_headers()
        self.end_headers()

    def do_GET(self):
        if self.path != "/getToken":
            self.send_response(404)
            self._send_cors_headers()
            self.end_headers()
            self.wfile.write(b"Not found")
            return

        try:
            creds = build_credentials()
            creds.refresh(Request())
            token = creds.token
            body = json.dumps({"access_token": token}).encode("utf-8")

            self.send_response(200)
            self._send_cors_headers()
            self.send_header("Content-Type", "application/json")
            self.send_header("Content-Length", str(len(body)))
            self.end_headers()
            self.wfile.write(body)
        except Exception as e:
            msg = str(e).encode("utf-8")
            self.send_response(500)
            self._send_cors_headers()
            self.send_header("Content-Type", "text/plain; charset=utf-8")
            self.send_header("Content-Length", str(len(msg)))
            self.end_headers()
            self.wfile.write(msg)


def run():
    server_address = ("127.0.0.1", PORT)
    httpd = HTTPServer(server_address, TokenHandler)
    print(f"Vertex Auth Helper running on http://127.0.0.1:{PORT}")
    print("Press Ctrl+C to stop.")
    httpd.serve_forever()


if __name__ == "__main__":
    run()
