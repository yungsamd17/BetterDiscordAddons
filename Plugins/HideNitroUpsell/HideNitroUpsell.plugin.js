/**
 * @name Hide Nitro Upsell
 * @description Hides all upsell of Nitro in common used UI across the Discord.
 * @author Sam @yungsamd17
 * @version 1.0
 * @authorId 402083911053869056
 * @invite GYveRfruk6
 * @donate https://ko-fi.com/yungsamd17
 * @website https://yungsamd17.github.io/
 * @source https://github.com/yungsamd17/BetterDiscordAddons/tree/main/Plugins/HideNitroUpsell
 * @updateUrl https://raw.githubusercontent.com/yungsamd17/BetterDiscordAddons/main/Plugins/HideNitroUpsell/HideNitroUpsell.plugin.js
*/

module.exports = () => ({
  observer: null,

  start() {
    function hideElements() {
      // Hide all <a> elements with href="/store"
      const storeLinks = document.querySelectorAll('a[href="/store"]');
      storeLinks.forEach(link => {
        link.style.display = 'none';
      });

      // Hide the <div> with id="message-add-reaction-1"
      const reactionDiv = document.getElementById('message-add-reaction-1');
      if (reactionDiv) {
        reactionDiv.style.display = 'none';
      }

      // Hide the <button> with aria-label="Send a gift"
      const giftButton = document.querySelector('button[aria-label="Send a gift"]');
      if (giftButton) {
        giftButton.style.display = 'none';
      }

      // Hide the <div> with class containing 'premiumFeatureBannerBackground'
      const premiumBannerDivs = document.querySelectorAll('[class*="premiumFeatureBannerBackground-"]');
      premiumBannerDivs.forEach(div => {
        div.style.display = 'none';
      });
    }

    // Function to observe DOM mutations and reapply the hiding logic
    function observeDOM() {
      const targetNode = document.body;
      const config = { childList: true, subtree: true };
      const callback = function (mutationsList) {
        for (const mutation of mutationsList) {
          if (mutation.type === 'childList') {
            hideElements();
          }
        }
      };

      this.observer = new MutationObserver(callback);
      this.observer.observe(targetNode, config);
    }

    hideElements();
    observeDOM();
  },

  stop() {
    // Disconnect the observer when the plugin is stopped
    if (this.observer) {
      this.observer.disconnect();
    }
  },
});