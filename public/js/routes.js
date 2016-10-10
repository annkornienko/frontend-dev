angular.module('appTest')
    .config(['$routeProvider', '$locationProvider',
        function($routeProvider, $locationProvider) {
            $routeProvider

            // home page
                .when('/', {
                  templateUrl: 'views/ListInvoices.html',
            })

                .when('/api/invoices/:invoices_id', {
                  templateUrl: 'views/invoice.html',
                  controller: "CurrentInvoiceCtrl"
            });

            $locationProvider.html5Mode(true);

        }
    ]);
