$(function() {
  var count = 0;
  var employees = [];
  var $p = $('p');
  var salaryTemplateScript = $('#salary-total').html();
  var salaryTemplate = Handlebars.compile(salaryTemplateScript);
  var listTemplateScript = $('#employeetable').html();
  var listTemplate = Handlebars.compile(listTemplateScript);
  function Employee(first, last, number, title, review, salary) {
    this.firstName = first;
    this.lastName = last;
    this.emplNumber = number;
    this.title = title;
    this.reviewRating = review;
    this.salary = salary;
  }

  //function calculates the total salary of the employees in the array, then changes text of p tag to reflect it
  function updateSalaryTotal() {
    var total = {salary: 0};
    employees.forEach(function(elem) {
      total.salary += parseInt(elem.salary);
    });
    $('header').html(salaryTemplate(total));
  }

  //function to remove employees
  function removeEmployee(emp) {
    for (var i = 0; i < employees.length; i++) {
      if (employees[i].emplNumber === emp.emplNumber) {
        employees.splice(i, 1);
        break;
      }
    }
    employeeRender();
    updateSalaryTotal();
    /*var parentID = $(this).closest('tr').attr('id');


    $('#' + parentID).remove();
    employees.splice(indexOfEmployee, 1);
    updateSalaryTotal();
    if (employees.length == 0) {        //if all the employees have been removed, hide the table and total element
      $('table').addClass('hidden');
      $p.text('');
      $p.css('border', 'none');
    }*/
  }

  //Takes in employee object, adds it to html table along with button and employee rating style
  function employeeRender() {
    $('.employees').html(listTemplate({list: employees}));
  }
  function addEmployee(emp) {
    var alreadythere = employees.find(function(elem) {
      console.log(elem.emplNumber, emp.emplNumber);
      if (elem.emplNumber == emp.emplNumber) {
        return true;
      }
    });
    console.log(alreadythere);
    if (alreadythere != undefined) {
      return;
    }
    employees.push(emp);
    employees.sort(function(a, b) {
      if(a.firstName.toUpperCase() > b.firstName.toUpperCase()) {
        return 1;
      } else if (a.firstName.toUpperCase() < b.firstName.toUpperCase()) {
        return -1;
      } else {
        return 0;
      }
    });

  }
  //event handler for form submit, calls employeeRender to add information to table
  $('form').on('submit', function(event) {
    try {
      var data = $(this).serializeArray();
      addEmployee(new Employee(data[0].value, data[1].value, data[2].value, data[3].value, data[4].value, data[5].value));
      employeeRender();
      updateSalaryTotal();
    } catch (e) {
      console.log(e);
    } finally {
      event.preventDefault();
    }

    $('form')[0].reset();
  });

  //event handler for removal of employees
  $('table').on('click','button',  function() {
    $(this).closest('tr').remove();
  });

  $('.employees').append(listTemplate({list: employees}));
  //event handler for random employee generator, uses chance.js library for randomization
  $('aside').on('click', 'button', function(event) {
    var randEmployee = new Employee(chance.first(), chance.last(), chance.natural({min: 1000, max: 9999999}), chance.word(), chance.natural({min: 1, max: 5}), 1000 * chance.natural({min: 1, max: 999}));
    addEmployee(randEmployee);
    employeeRender();
    updateSalaryTotal();

  });

});
