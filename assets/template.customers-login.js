(function($) {

  'use strict';

  theme.customerLogin = function() {
    var header_h,
      stickyHeader = document.querySelector('sticky-header'),
      config = {
        recoverPasswordForm: '#RecoverPassword',
        hideRecoverPasswordLink: '#HideRecoverPasswordLink'
      };

    if (window.location.href.indexOf('#recover') !== -1) {
      header_h = stickyHeader && stickyHeader.getStickyHeight ? stickyHeader.getStickyHeight() : 0;

      $('html, body').stop().animate({
        scrollTop: $('#RecoverPasswordForm').offset().top - header_h - 35,
        duration: 0
      });
    }

    if (!$(config.recoverPasswordForm).length) {
      return;
    }

    checkUrlHash();
    resetPasswordSuccess();

    $(config.recoverPasswordForm).on('click', onShowHidePasswordForm);
    $(config.hideRecoverPasswordLink).on('click', onShowHidePasswordForm);

    function onShowHidePasswordForm(evt) {
      evt.preventDefault();
      toggleRecoverPasswordForm();
    }

    function checkUrlHash() {
      var hash = window.location.hash;

      if (hash === '#recover') {
        toggleRecoverPasswordForm();
      }
    }

    function toggleRecoverPasswordForm() {
      $('#RecoverPasswordForm').toggleClass('hide');
      $('#CustomerLoginForm').toggleClass('hide');
    }

    function resetPasswordSuccess() {
      var $formState = $('.reset-password-success');

      if (!$formState.length) {
        return;
      }

      $('#ResetSuccess').removeClass('hide');
    }
  };

  theme.AssetsLoader.onPageLoaded(function() {
    theme.customerLogin();
  });
})(jQueryTheme);