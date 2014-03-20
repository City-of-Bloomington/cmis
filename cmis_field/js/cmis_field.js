"use strict";
(function ($) {
  Drupal.behaviors.cmisField = {
    attach: function(context, settings) {
      //TODO: This selector doesn't seem right - will it work if there's a different default lang.?
      //$("#edit-field-cmis-und-0-title", context).after('<input type="button" id="edit-cmis-field" class="cmis-field-insert-button form-submit" value="Browse" />');
      $(".edit-field-cmis-field",                            context).after('<input type="button" id="edit-cmis-field" class="cmis-field-insert-button form-submit" value="Browse" />');
      $("#edit-instance-settings-cmis-field-rootfolderpath", context).after('<input type="button" id="edit-cmis-settings" class="cmis-field-insert-button form-submit" value="Browse" />');
      $('.cmis-field-insert-button').click(function() {
          var browserUrl = Drupal.settings.basePath + 'cmis/browser',
              rootDir    = Drupal.settings.cmispath,
              caller     = ($(this).attr('id') == 'edit-cmis-settings') ? 'settings' : 'widget';

          if (rootDir) { browserUrl += rootDir; }

          //TODO: Make this a modal, not a popup (will be much harder to manage context when clicking around the cmis browser)
          window.open(browserUrl + '?type=popup&caller=' + caller, 'cmisBrowser', 'width=800,height=500,resizable');
          return false;
      });

      $(".cmis-field-insert", context).click(function () {
        if ($.query['caller'] == 'settings') {
          var cmispath = $(this).attr('href');
          $('#edit-instance-settings-cmis-field-rootfolderpath', window.opener.document).val(cmispath.replace("//", "/"));
        }
        else {
          var cmispath = $(this).attr('id'),
              cmisname = $(this).attr('name');
          //$('#edit-field-cmis-und-0-title', window.opener.document).val(cmisname);
          $('.edit-field-cmis-field', window.opener.document).val(cmisname);
          $('.edit-field-cmis-path',  window.opener.document).val(cmispath);
        }
        window.close();
        return false;
      });
    }
  };

  $.query = (function (a) {
    var b = {},
        i = 0,
        p = [];

    if (a == "") return {};
    for (i = 0; i < a.length; ++i) {
        p = a[i].split('=');
        b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
    }
    return b;
  })(window.location.search.substr(1).split('&'));
})(jQuery);
