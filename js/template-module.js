var template = ( function(){
  var templateobject = {};
  //wait for window to load before selecting the template because the template is at the bottom
  window.addEventListener('load',() => {
    //we select the template
    const tmpl = document.querySelector('#task-template');
    templateobject.template = tmpl;
  });

  templateobject.create = function(taskobj){
    //import the content of the template
    let template = document.importNode(templateobject.template.content,true);
    let template_html = template.querySelector('li');
    //fill the template with data from taskobj
    template_html.setAttribute('data-id',taskobj.id);
    template_html.setAttribute('data-status',taskobj.status);
    template_html.setAttribute('data-name',taskobj.name);
    template_html.querySelector('.task-text').innerText = taskobj.name;
    template_html.querySelector('button[data-function="delete"]').setAttribute('data-id',taskobj.id);
    template_html.querySelector('button[data-function="status"]').setAttribute('data-id',taskobj.id);

    return template_html;
  }

  return templateobject;
} ());
