(function (doc, win) {
  "use strict";

  win.callbacks = win.callbacks || {};
  win.callbacks.petitions = {
     preSubmit: function() {
      /**
       * Fires up the loading modal and disables the form
       * @return {object} - modal with spinner
       * */
      doc.querySelector('[type="submit"]').setAttribute('disabled', true); // JL DEBUG ~ disable for testing
    },

    loadSignatureResponse: function(e) {
      /**
       * Does the thing after we get a response from the API server
       * */

      var xhr = e.target;

      if (xhr.status >= 200 && xhr.status < 400) {

        hideForm()

      } else {
        win.callbacks.petitions.handleSigningError(xhr);
      }
    },

    handleSigningError: function(e) {
      /**
       * Figures out what to say at just the right moment
       * @param {event|XMLHttpRequest} e - Might be an event, might be a response
       * from an XMLHttpRequest
       * */


      doc.querySelector('[type="submit"]').removeAttribute('disabled');

      alert('AN ERROR OCCURRED DURING SUBMISSION :(\n\nPlease contact team@fightforthefuture.org');
    }
  }

})(document, window);
