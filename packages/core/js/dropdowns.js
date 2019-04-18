function dropdowns($elements) {
  $elements.forEach($dropdown => {
    if ($dropdown.classList.contains('dropdown-hoverable')) {
      return;
    }

    const $toggle = $dropdown.querySelector('[data-toggle="dropdown"]');
    $toggle.addEventListener('click', e => {
      function dismissDropdown() {
        $toggle.classList.remove('btn-active');
        $dropdown.classList.remove('dropdown-show');
        document.removeEventListener('click', dismissDropdown);
      }

      if (!$dropdown.classList.contains('dropdown-show')) {
        $toggle.classList.add('btn-active');
        $dropdown.classList.add('dropdown-show');
        setTimeout(() => {
          document.addEventListener('click', dismissDropdown);
        }, 0);
      } else {
        dismissDropdown();
      }
    });
  });
}
