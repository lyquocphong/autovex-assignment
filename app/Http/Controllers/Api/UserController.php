<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Api\BaseController;
use App\Http\HttpStatusCodes;
use App\Http\Requests\Api\User\Setting\SetClockRequest;
use App\Models\UserSetting;
use App\Enum\UserSetting as UserSettingEnum;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends BaseController
{
    public function setClockSetting(SetClockRequest $request): JsonResponse
    {
        $user = Auth::user();

        $setingValue = $request->validated();

        if ($user) {
            $setting = UserSetting::updateOrCreate(
                ['user_id' => $user->id, 'name' => UserSettingEnum::CLOCK->name],
                ['value' => $setingValue]
            );


            return $this->respondSuccess('Clock setting', HttpStatusCodes::OK, [
                'clock' => $setting
            ]);
        }

        return $this->respondError('Cannot find user', HttpStatusCodes::BAD_REQUEST);
    }
}
