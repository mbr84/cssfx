document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('buttons').addEventListener('click', (e) => {
    document.getElementsByClassName('box')[0].className = `box ${e.target.id}`;
  });
});
