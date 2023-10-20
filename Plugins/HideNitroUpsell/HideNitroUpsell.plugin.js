/**
 * @name Hide Nitro Upsell
 * @description Hides all upsell of Nitro in common used UI across the Discord.
 * @author Sam @yungsamd17
 * @version 1.1
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
      // Store button link in Direct Messages
      const storeLinks = document.querySelectorAll('a[href="/store"]');
      storeLinks.forEach(link => {
        link.style.display = 'none';
      });

      // Super Reaction in message right click context menu
      const reactionDiv = document.getElementById('message-add-reaction-1');
      if (reactionDiv) {
        reactionDiv.style.display = 'none';
      }

      // Gift button in message input box
      const giftButton = document.querySelector('button[aria-label="Send a gift"]');
      if (giftButton) {
        giftButton.style.display = 'none';
      }

      // Profile decoration banner for Nitro Shop in Profile settings
      const premiumBannerDivs = document.querySelectorAll('[class*="premiumFeatureBannerBackground-"]');
      premiumBannerDivs.forEach(div => {
        div.style.display = 'none';
      })

      // Small "Add Super Reaction" button on right of the message when hovering over it
      const smallReactionDiv = document.querySelectorAll('[aria-label="Add Super Reaction"]');
      smallReactionDiv.forEach(div => {
        div.style.display = 'none';
      })
      // Super Reaction tab in Reactions menu 'picker'
      const superReactionTab = document.getElementById('super-reaction-picker-tab');
      if (superReactionTab) {
        superReactionTab.style.display = 'none';
      };
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