<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

use function Pest\Laravel\json;

class UserController extends Controller
{
    public function index(Request $request) {
        $users = User::where('role', '!=', 'admin')
        ->select('user_id', 'name', 'email', 'role', 'created_at')
        ->get();

        if($users->isEmpty()) {
            return response()->json([
                'message' => 'users data not found',
                'data' => []
            ], 404);
        }

        return response()->json([
            'message' => 'get all registered users',
            'data' => $users
        ], 200);
    }

    public function destroy(Request $request, $id) {
        $user = User::where('user_id', $id)->first();

        if(!$user) {
            return response()->json([
                'message' => "user id: $id not found",
                'data' => []
            ], 404);
        }

        if ($user->role === 'admin') {
            return response()->json([
                'message' => "cannot delete another admin"
            ], 403);
        }

        $user->delete();

        return response()->json([
            'message' => "user id: $id deleted"
        ], 200);
    }
}
