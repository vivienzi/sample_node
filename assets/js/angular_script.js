var my_app = angular.module('my_app', []);
var url = "http://127.0.0.1:8085/";
my_app.controller('my_cntrl', function($scope, $http) {
	$scope.show_add_form = function() {
		document.getElementById('input_user_info').style.display = '';
		document.getElementById('add_user_button').style.display = 'none';
	};
	
	$scope.save_user_data = function() {
		var user_data = {
			"name":$scope.username,
			"email":$scope.email,
			"phone":$scope.phone,
			"location":$scope.location,
			"age":$scope.age
		};
		$http.post('/save_user', user_data).then(
			function(success_response) {
				if(success_response.data.flag=='success') {
					//alert('Saved successfully');
					document.getElementById('input_user_info').style.display = 'none';
					$scope.user_list.push(success_response.data.user);
					document.getElementById('add_user_button').style.display = '';
				} else {
					alert('Error while saving user data');
				}
			},
			function(err_response) {
				console.log('Error '+err_response);
			}
		);
	};
	
	$scope.list_users = function() {
		$http.get('/list_users').then(
			function(success_resp) {
				document.getElementById('user_list').style.display = '';
				document.getElementById('input_user_info').style.display = 'none';
				document.getElementById('add_user_button').style.display = '';
				$scope.user_list = success_resp.data; 
			},
			function(err_resp) {
				console.log('Error !!!');
			}
		);
	};
	
	$scope.delete_user = function(user_id) {
		$http({'method':'DELETE', 'url':'/delete_user/'+user_id}).then(
			function(success_resp) {
				if(success_resp.data=='success') {
					//alert('deleted successfully');
					for(var i=0; i<$scope.user_list.length; i++) {
						if ($scope.user_list[i]._id == user_id) {
							$scope.user_list.splice(i, 1);
							break;
						}
					}
				}
			},
			function(err_resp) {
				console.log('Error !!!');
			}
		);
	};
	
});