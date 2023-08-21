<?php

namespace App\Http\Controllers\Api;

use App\Http\HttpStatusCodes;
use Illuminate\Http\JsonResponse;
use App\Http\Controllers\Controller;

class BaseController extends Controller
{
    /**
     * Response Json back to client
     *
     * @param string $message
     * @param array $data
     * @param int $statusCode
     * 
     * @return JsonResponse
     */
    protected function respond($message, $data = [], $statusCode = HttpStatusCodes::OK): JsonResponse
    {
        $response = [
            'message' => $message,
            'data' => $data,
        ];

        return response()->json($response, $statusCode);
    }

    /**
     * Response success back to client
     *
     * @param string $message
     * @param number $statusCode
     * @param array $data
     * 
     * @return JsonResponse
     */
    protected function respondSuccess($message = 'Success', $statusCode = HttpStatusCodes::OK, $data = []): JsonResponse
    {
        return $this->respond($message, $data, $statusCode);
    }

    /**
     * Response error back to client
     *
     * @param string $message
     * @param number $statusCode
     * @param array $data
     * 
     * @return JsonResponse
     */
    protected function respondError($message = 'Error', $statusCode = HttpStatusCodes::BAD_REQUEST, $data = [])
    {
        return $this->respond($message, $data, $statusCode);
    }
}
