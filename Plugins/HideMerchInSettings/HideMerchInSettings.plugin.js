/**
 * @name Hide Merch link in Settings
 * @description Hides Merch button link to Disord Merch Store.
 * @author Sam @yungsamd17
 * @version 1.0
 * @authorId 402083911053869056
 * @invite GYveRfruk6
 * @donate https://ko-fi.com/yungsamd17
 * @website https://yungsamd17.github.io/
 * @source https://github.com/yungsamd17/BetterDiscordAddons/tree/main/Plugins/HideMerchInSettings
 * @updateUrl https://raw.githubusercontent.com/yungsamd17/BetterDiscordAddons/main/Plugins/HideMerchInSettings/HideMerchInSettings.plugin.js
*/

module.exports = () => ({
  observer: null,

  start() {
    function hideElement() {
      // Hide the <div> with aria-label="Merch"
      const merchLink = document.querySelector('div[aria-label="Merch"]');
      if (merchLink) {
        merchLink.style.display = 'none';
      }
    }

    // Function to observe DOM mutations and reapply the hiding logic
    function observeDOM() {
      const targetNode = document.body;
      const config = { childList: true, subtree: true };
      const callback = function (mutationsList) {
        for (const mutation of mutationsList) {
          if (mutation.type === 'childList') {
            hideElement();
          }
        }
      };

      this.observer = new MutationObserver(callback);
      this.observer.observe(targetNode, config);
    }

    hideElement();
    observeDOM();
  },

  stop() {
    // Disconnect the observer when the plugin is stopped
    if (this.observer) {
      this.observer.disconnect();
    }
  },
});