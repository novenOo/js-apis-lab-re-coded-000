var createGist = function(file_name, content, description, token){
  var data = {'public':   true, 'description': description,'files': {} };
  data['files'][file_name] = { 'content': content};

  $.ajax({
    url: 'https://api.github.com/gists',
    type: 'POST',
    dataType: 'json',
    beforeSend: function(xhr) {
      xhr.setRequestHeader("Authorization", "token " + token);
    },
    data: JSON.stringify(data)
  }).done(function(response) {
    myGists(response.owner.login, token);
  });
};

var myGists = function (username, token){
  $.ajax({ 
    url: 'https://api.github.com/users/' + username + '/gists',
    type: 'GET',
     dataType: 'jsonp'
      }).done(function(response) {
         console.log(response);
         $.each(response.data,function(i,gist){
               var a ='<a href="'+gist.html_url+'">' + gist.description+'</a>'
               $('#gists ul').prepend('<li>'+a+'</li>');
              
          })
});

};

var bindCreateButton = function() {
  // call functions here
  $('#create').on('click',function(){
      $('#gists ul').html('loading gists ......</br>');
      createGist($('#name').val(),$('#content').val(),$('#description').val(),$('#token').val())
  })

};
function read() {
  // body...
  $('#read').on('click',function(){
          //myGists('alrawi90','')
  })
}
$(document).ready(function(){
  bindCreateButton()
  read()
});