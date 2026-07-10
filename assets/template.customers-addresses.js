(function($) {

  'use strict';

  theme.AssetsLoader.onPageLoaded(function() {
    theme.customerAddresses = (function() {
      var $newAddressForm = $('#AddressNewForm');

      if (!$newAddressForm.length) {
        return;
      }

      if (Shopify) {
        new Shopify.CountryProvinceSelector('AddressCountryNew', 'AddressProvinceNew', {
          hideElement: 'AddressProvinceContainerNew'
        });
      }

      $('.address-country-option').each(function() {
        var formId = $(this).data('form-id');
        var countrySelector = 'AddressCountry_' + formId;
        var provinceSelector = 'AddressProvince_' + formId;
        var containerSelector = 'AddressProvinceContainer_' + formId;

        new Shopify.CountryProvinceSelector(countrySelector, provinceSelector, {
          hideElement: containerSelector
        });
      });

      $('.address-new-toggle').on('click', function() {
        $newAddressForm.toggleClass('hide');
      });

      $('.address-edit-toggle').on('click', function() {
        var formId = $(this).data('form-id');
        $('#EditAddress_' + formId).toggleClass('hide');
      });

      $('.address-delete').on('click', function() {
        var $el = $(this);
        var formId = $el.data('form-id');
        var confirmMessage = $el.data('confirm-message');
        if (confirm(confirmMessage || 'Are you sure you wish to delete this address?')) {
          Shopify.postLink('/account/addresses/' + formId, {
            parameters: {
              _method: 'delete'
            }
          });
        }
      });
    })();
  });
})(jQueryTheme);