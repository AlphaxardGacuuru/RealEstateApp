<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Property extends Model
{
    public function user()
	{
		$this->belongsTo('App\User');
	}
}
