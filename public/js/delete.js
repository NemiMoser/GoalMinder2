function deleteDiv() {
  // Get the div you want to delete
  const divToDelete = document.querySelector('#notification');
  
  if (divToDelete) {
    // Check if the div exists, then remove it
    divToDelete.remove();
  } else {
    console.log("The div does not exist or has already been removed.");
  }
}
