<?php

namespace App\Http\Controllers\Api;

use App\Enum\UserSetting as UserSettingEnum;
use App\Http\Controllers\Api\BaseController;
use App\Http\HttpStatusCodes;
use App\Http\Requests\Api\Auth\LoginRequest;
use App\Http\Requests\Api\Auth\RegisterRequest;
use App\Models\User;
use App\Models\UserSetting;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends BaseController
{
    /**
     * Function to login user into system
     *
     * @param LoginRequest $request
     * @return JsonResponse
     */
    public function login(LoginRequest $request): JsonResponse
    {
        $credentials = $request->validated();

        if (!Auth::attempt($credentials)) {
            $request->session()->regenerate();
            return $this->respondError('Authenticated failed');
        }

        $user = Auth::user();
        $data = $this->generateResponseData($user);


        return $this->respondSuccess('Login success', HttpStatusCodes::OK, $data);
    }

    /**
     * Log the user out of the application.
     * 
     * Because now we are using Sanctum and set session to cookie
     * when make a request the following cookie is included and
     * system will know whom it should logged out
     */
    public function logout(Request $request): JsonResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return $this->respondSuccess();
    }

    public function register(RegisterRequest $request)
    {
        $userInfo = $request->validated();

        $newUser = User::create($userInfo);

        $data = $this->generateResponseData($newUser);

        return $this->respondSuccess('Register success', HttpStatusCodes::CREATED, $data);
    }

    private function generateResponseData($user)
    {
        $data = $user->toArray();
        $clockSetting = UserSetting::where('user_id', $user->id)->where('name', UserSettingEnum::CLOCK->value)->first()->toArray();
 
        $data['settings'] = [
            'clock' => $clockSetting['value']
        ];

        return $data;
    }
}
