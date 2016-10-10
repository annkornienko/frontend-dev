var app = angular.module("appTest", ["ngRoute"])

.controller("ListInvoicesCtrl", function($scope, GetAllInvoices, $location) {
    GetAllInvoices.getInvoices().then(function(data) {
        $scope.invoices = data;
        $scope.handleClickTR = function(e) {
            $scope.invoices_id = parseInt(e.currentTarget.firstElementChild.innerText);
            $location.path("api/invoices" + "/" + parseInt(e.currentTarget.firstElementChild.innerText));
        }
    })
})

.controller("CurrentInvoiceCtrl", function($scope, GetCurrentInvoice, $routeParams, SendChangeData, $rootScope, GetCustomerData) {
    var id = parseInt($routeParams.invoices_id);
    GetCurrentInvoice.getInvoice(id).then(function(data) {
        $scope.idx = [];
        $scope.val = [];
        angular.forEach(data, function(value, key) {
            $scope.idx.push(key);
            $scope.val.push(value);
        })
        $scope.invoice = data;

        //Load table customer
        GetCustomerData.getCustomerData($scope.invoice.customer_id).then(function(data) {
            $scope.idxCustomer = [];
            $scope.valCustomer = [];
            if ($scope.invoice.customer_id) {
                $scope.customerExist = true;
            }
            angular.forEach(data, function(value, key) {
                $scope.idxCustomer.push(key);
                $scope.valCustomer.push(value);
            })
        })
    })

    //MODIFY
    $scope.editingData = {};

    $scope.modifyInvoices = function(invoice) {
        angular.forEach($scope.invoice, function(val, key) {
            $scope.editingData[key] = true;
        })
    }

    $scope.modify = function(e, key, field) {
        if (e.type == "blur") {
            var params = {};
            params[key] = field;
            console.log(params);
            SendChangeData.sendChange(id, params).then(function(res) {
                console.log(res);
            });
            $scope.editingData[key] = false;

            //Modify table customer
            if (key == "customer_id") {
              console.log(field);
              if (isNaN(field)) {
                $scope.customerExist = false;
                return false;
              }
                var customerId;
                GetCustomerData.getCustomerData(field).then(function(data) {
                    $scope.idxCustomer = [];
                    $scope.valCustomer = [];
                    if (field) {
                        $scope.customerExist = true;
                    }
                    angular.forEach(data, function(value, key) {
                        $scope.idxCustomer.push(key);
                        $scope.valCustomer.push(value);
                    })
                })
            }
        }
    }
})
