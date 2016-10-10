angular
    .module("appTest")
    .service("GetAllInvoices", function($http) {
        this.getInvoices = function getInvoices() {
            return $http.get("/api/invoices").
            then(function(res) {
                return res.data;
            }, function(response) {
                alert("Error retrieving invoices.");
            });
        }
    })

    .service("GetCurrentInvoice", function($http) {
        this.getInvoice = function getInvoice(id) {
          return $http.get("/api/invoices/" + id)
          .then(function(res) {
            return res.data;
          }, function(res) {
              alert("Error retrieving invoice.");
          })
        }
    })

    .service("GetCustomerData", function($http) {
      this.getCustomerData = function getCustomerData(id) {
        return $http.get("/api/customers/" + id)
        .then(function(res) {
          return res.data;
        }, function(res) {
            alert("Error retrieving customers.")
        })
      }
    })

    .service("SendChangeData", function($http) {
      this.sendChange = function sendChange(id,params) {
        var req = {
          method: 'PUT',
          url: "/api/invoices/" + id,
          data: JSON.stringify(params)
        }
        return $http(req)
        .then(function(res) {
          return res;
        }, function(res) {
            alert("Error retrieving invoice.");
        })
      }
    })
