function tabs($elements) {
  $elements.forEach($tabs => {
    $tabs.addEventListener('click', (e) => {
      if (e.target && e.target.classList.contains('tab-item')) {
        $tabs.querySelectorAll('.tab-item').forEach($tabItem => 
          $tabItem.classList.remove('tab-active')
        );
        e.target.classList.add('tab-active');
      }
    });
  });
}