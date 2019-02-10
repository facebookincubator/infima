function pills($elements) {
  $elements.forEach($pills => {
    $pills.addEventListener('click', (e) => {
      if (e.target && e.target.classList.contains('pill-item')) {
        $pills.querySelectorAll('.pill-item').forEach($pillItem => 
          $pillItem.classList.remove('pill-active')
        );
        e.target.classList.add('pill-active');
      }
    });
  });
}