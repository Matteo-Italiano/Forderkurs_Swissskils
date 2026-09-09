<?php

namespace Skills17\Lib\Http;

class Response
{
    /**
     * Sends a response.
     *
     * @param mixed $body Body that should be sent
     * @param int $statusCode HTTP response status code
     * @param int $contentType Content-Type header. If "application/json", encodes the body as JSON
     */
    public function send(mixed $body, int $statusCode = 200, string $contentType = "application/json"): void
    {
        http_response_code($statusCode);

        if ($statusCode === 204) {
            file_put_contents('php://stderr', '[' . date('D M j G:i:s Y') . "] INFO: Skip sending response body for status code 204\n");
        } else {
            header("Content-Type: {$contentType}");
            if ($contentType == "application/json") {
                echo json_encode($body, JSON_PRETTY_PRINT);
            } else {
                echo $body;
            }
        }
    }
}
