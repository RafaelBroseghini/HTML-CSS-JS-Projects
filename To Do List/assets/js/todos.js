// Check off todos by clicking.
$("ul").on("click", "li", function() {
    $(this).toggleClass("completed")
})

// Remove todos when span is fired.
$("ul").on("click", "span", function (event) {
  $(this).parent().fadeOut(1000, function () {
    $(this).remove();
  })
  event.stopPropagation();
})

// Add new todos when enter is fired inside the text input.

$("input").on("keypress", function(event) {
  if (event.which === 13) {
    var todoText = $(this).val();
    $(this).val("");
    // Create new li and add to ul.
    $("ul").append("<li><span><i class='fa fa-trash' aria-hidden='true'></i></span> "+ todoText +"</li>")

  }
});

// Fade form add to do out.

$(".fa-plus").on("click", function() {
  $("input").fadeToggle(500);
});
