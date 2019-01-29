setTimeout(() => {
  const text = document.querySelector(".text");
  // text.removeClass('hidden');
  console.log(text);
  console.log(text.classList);
  text.classList = "text";
}, 1500);
