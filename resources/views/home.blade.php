<!doctype html>
<html lang="{{ app()->getLocale() }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Carthook</title>
        <link href="{{ asset('css/app.css') }}" rel="stylesheet">
        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Raleway:100,600" rel="stylesheet" type="text/css">
    </head>
    <body>
    <header>
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-12 bg-primary">
                    <a href="/"><img src="{{asset('img/carthook-logo.svg')}}" /></a>
                </div>
            </div>
        </div>
    </header>
    <div class="container innerContainer">
        <div class="row">
            <div class="col-md-12">
                <h1>Type NBA player name or surname</h1>
                <form>
                    <div class="form-group">
                        <input type="search" name="playerSearch" class="form-control" placeholder="Search for NBA Player (at least 3 characters)">
                    </div>
                </form>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <hr />
                <div class="playerName"></div>
                <div class="playerInfo"></div>
                <div class="playerStats"></div>
            </div>
        </div>
    </div>

    <script src="{{ asset('js/jquery.js') }}"></script>
    <script src="{{ asset('js/common.js') }}"></script>
    </body>
</html>