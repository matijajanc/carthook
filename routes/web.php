<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('home');

    // B
//    $removeFilesThatStartsWith = "0aH";
//    $path = storage_path('app\test_folder');
//    $directory = new \RecursiveDirectoryIterator($path);
//    $iterator = new \RecursiveIteratorIterator($directory);
//    $files = [];
//    foreach ($iterator as $info) {
//        if ($info->getType() == 'file' && substr($info->getFilename(), 0, 3) === $removeFilesThatStartsWith) {
//            $files[] = $info->getPathname();
//            unlink($info);
//        }
//    }


    // C
//    $start = microtime(true);
//    $numbers = [45, 23, 67, 12, 11, 4, 67, 88, 53, 15, 43];
//
//    $times=0;
//    while($times<100000)
//    {
//        sort($numbers);
//        $times++;
//    }
//    $time_elapsed_secs = microtime(true) - $start;
//    dd($time_elapsed_secs);

    
    // D
//    $numbers = [];
//    $times=0;
//    while($times<10000)
//    {
//        array_push($numbers, bcpow(rand(100,10000), rand(100,10000)));
//        $times++;
//    }

//    $start = microtime(true);
//    //dd($numbers);
//    sort($numbers);
//    $time_elapsed_secs = microtime(true) - $start;
//    dd($time_elapsed_secs);
    
});
