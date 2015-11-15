$(function() {
  var count = 0;
  var employees = [];
  function Employee(first, last, number, title, review, salary) {
    this.firstName = first;
    this.lastName = last;
    this.emplNumber = number;
    this.title = title;
    this.reviewRating = review;
    this.salary = salary;
  }

  //Takes in employee object, adds it to html table along with button and employee rating style
  function employeeRender(emp) {
    var $tr = $('<tr>');
    var $buttontd = $('<td>');
    var $button = $('<button>');
    $button.text('Remove Employee');
    $buttontd.append($button);
    for (var prop in emp) {
      var $td = $('<td>');
      $td.text(emp[prop]);
      if (prop == 'reviewRating') {
        switch (parseInt(emp[prop])) {
          case 1:
            $td.css('background-color', 'red');
            break;
          case 2:
            $td.css('background-color', 'orange');
            break;
          case 3:
            $td.css('background-color', 'yellow');
            break;
          case 4:
            $td.css('background-color', 'greenyellow');
            break;
          case 5:
            $td.css('background-color', 'green');
            break;
        }
      }

      $tr.attr('id', emp.firstName + emp.lastName);
      $tr.append($td);

    }

    $tr.append($buttontd);
    if (employees.length == 0 || emp.firstName.toUpperCase() >= employees[employees.length - 1].firstName.toUpperCase()) {
      employees.push(emp);
      $('table').append($tr);
      $('table').removeClass('hidden');
      console.log(employees);
    } else if (emp.firstName.toUpperCase() <= employees[0].firstName.toUpperCase()) {
      $('table').find('#' + employees[0].firstName + employees[0].lastName).before($tr);
      employees.unshift(emp);
      console.log(employees);
    } else {
      for (var i = 0; i < employees.length - 1; i++) {
        if (emp.firstName.toUpperCase() > employees[i].firstName.toUpperCase() && emp.firstName.toUpperCase() < employees[i + 1].firstName.toUpperCase()) {
          $('table').find('#' + employees[i].firstName + employees[i].lastName).after($tr);
          employees.splice(i + 1, 0, emp);
          console.log(employees);
          break;
        }
      }
    }
  }

  //event handler for form submit, calls employeeRender to add information to table
  $('form').on('submit', function(event) {
    try {
      var data = $(this).serializeArray();
      var newEmployee = new Employee(data[0].value, data[1].value, data[2].value, data[3].value, data[4].value, data[5].value);
      employeeRender(newEmployee);
    } catch (e) {
      console.log(e);
    } finally {
      event.preventDefault();
    }
  });

  //event handler for removal of employees
  $('table').on('click', 'button', function() {

    var parentID = $(this).closest('tr').attr('id');
    count++;
    var indexOfEmployee = employees.findIndex(function(elem) {
        return elem.firstName + elem.lastName == parentID;
      });

    $('#' + parentID).remove();
    employees.splice(indexOfEmployee, 1);
    if (employees.length == 0) {
      $('table').addClass('hidden');
    }

  });

  //event handler for random employee generator, uses chance.js library for randomization
  $('aside').on('click', 'button', function(event) {
    var randEmployee = new Employee(chance.first(), chance.last(), chance.natural(), chance.word(), chance.natural({min:1, max:5}), chance.natural({min:10000, max:999999999}));
    employeeRender(randEmployee);
  });

});
