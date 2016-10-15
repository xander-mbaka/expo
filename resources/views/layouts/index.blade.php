<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js sidebar-large lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js sidebar-large lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js sidebar-large lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!-->
 <html class="no-js sidebar-large"><!--<![endif]-->

    <meta http-equiv="content-type" content="text/html;charset=UTF-8" />
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="description" content="">
        <meta name="keywords" content="" />
        <meta name="author" content="Alex mbaka" >
        <link rel="shortcut icon" href="assets/images/favicon.png">
        <title>Events Expo</title>
        <!--Master css-->
        <link href="{{ asset('/css/root.css') }}" rel="stylesheet">
    </head>

    <body id="body">
        <div class="loading"><img src="{{ asset('/image/loader.gif') }}" alt="loading-img"></div>
        <div class="content main">
            <div id="container" class="container-widget"></div>
        </div>
        <div id="fixed"></div>
        <div id="small-loader" class="row" style="display: none">
            <div style="position:fixed;bottom: 20px;left:50px;z-index:2">
                <div class="panel panel-widget">
                  <div class="panel-body">
                  <img src="{{ asset('/image/load.gif') }}" width="100" alt="loading-img">
                  </div>
                </div>
            </div>
        </div>
        <script data-main="{{ asset('/js/require_main') }}" src="{{ asset('/js/vendor/require.js') }}"></script>
    </body>
</html>
</html>
