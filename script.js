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
  function removeEmployee() {
    var parentID = $(this).closest('tr').attr('id');
    var indexOfEmployee = employees.findIndex(function(elem) {
        return elem.firstName + elem.lastName == parentID;
      });

    $('#' + parentID).remove();
    employees.splice(indexOfEmployee, 1);
    updateSalaryTotal();
    if (employees.length == 0) {        //if all the employees have been removed, hide the table and total element
      $('table').addClass('hidden');
      $p.text('');
      $p.css('border', 'none');
    }
  }

  //Takes in employee object, adds it to html table along with button and employee rating style
  function employeeRender(emp) {

    /*for (var prop in emp) {
      var $td = $('<td>');      //cycles through employee properties, adding the property value to the table text
      if (prop == 'salary') {
        $td.text('$' + emp[prop]);
      }else {
        $td.text(emp[prop]);
      }

      if (prop == 'reviewRating') {     //when it comes across reviewRating, add background color based on rating value
        $td.css('color', 'black');
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

      $tr.append($td);      //add table data to the current table row

    }

    $tr.attr('id', emp.firstName + emp.lastName);     //add id to table row for sorting and other functionality
    $tr.append($buttontd);     //add remove button as last child of table row
    //conditional statement to alphabetically (by first name) sort the table as employees are created
    if (employees.length == 0 || emp.firstName.toUpperCase() >= employees[employees.length - 1].firstName.toUpperCase()) {
      employees.push(emp);
      $('table').append($tr);   //add table row to end of table  if the table is empty or
      $('table').removeClass('hidden'); // the new employee goes after the last employee in the table
    } else if (emp.firstName.toUpperCase() <= employees[0].firstName.toUpperCase()) {
      $('table').find('#' + employees[0].firstName + employees[0].lastName).before($tr);
      employees.unshift(emp);   //add table row to beginning of table if employee goes before first employee in the table
    } else {
      for (var i = 0; i < employees.length - 1; i++) {
        if (emp.firstName.toUpperCase() > employees[i].firstName.toUpperCase() && emp.firstName.toUpperCase() < employees[i + 1].firstName.toUpperCase()) {
          $('table').find('#' + employees[i].firstName + employees[i].lastName).after($tr);
          employees.splice(i + 1, 0, emp);    //goes through employees array until new employee is between
          break;                              // the employees at the index and the one after, adds table row and array index between them
        }
      }
    }
*/
  }

  //event handler for form submit, calls employeeRender to add information to table
  $('form').on('submit', function(event) {
    try {
      var data = $(this).serializeArray();
      employees.push(new Employee(data[0].value, data[1].value, data[2].value, data[3].value, data[4].value, data[5].value));
      employees.sort(function(a, b) {
        if(a.firstName.toUpperCase() > b.firstName.toUpperCase()) {
          return 1;
        } else if (a.firstName.toUpperCase() < b.firstName.toUpperCase()) {
          return -1;
        } else {
          return 0;
        }
      });

      updateSalaryTotal();
    } catch (e) {
      console.log(e);
    } finally {
      event.preventDefault();
    }

    $('form')[0].reset();
  });

  //event handler for removal of employees
  $('table').on('click', 'button', removeEmployee);

  $('.employees').append(listTemplate({list: employees}));
  //event handler for random employee generator, uses chance.js library for randomization
  $('aside').on('click', 'button', function(event) {
    var randEmployee = new Employee(chance.first(), chance.last(), chance.natural({min: 1000, max: 9999999}), chance.word(), chance.natural({min: 1, max: 5}), 1000 * chance.natural({min: 1, max: 999}));
    employeeRender(randEmployee);
    updateSalaryTotal();

  });

});
