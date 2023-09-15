/**
 * @name Hide Help Button
 * @description Hides Help Button link in the toolbar.
 * @author Sam @yungsamd17
 * @version 1.0
 * @authorId 402083911053869056
 * @invite GYveRfruk6
 * @donate https://ko-fi.com/yungsamd17
 * @website https://yungsamd17.github.io/
 * @source https://github.com/yungsamd17/BetterDiscordAddons/tree/main/Plugins/HideHelpButton
 * @updateUrl https://raw.githubusercontent.com/yungsamd17/BetterDiscordAddons/main/Plugins/HideHelpButton/HideHelpButton.plugin.js
*/

module.exports = () => ({
  observer: null,

  start() {
    function removeDiscordSupportLink() {
      // get element
      const elements = document.querySelectorAll('div[class^="toolbar"]');

      // loop through each element
      elements.forEach((element) => {
        // check if the class starts with...
        if (element.className.startsWith('toolbar')) {
          // get link elements with...
          const linksToRemove = element.querySelectorAll('a[href="https://support.discord.com"]');
          // remove matching element
          linksToRemove.forEach((link) => {
            link.remove();
          });
        }
      });
    }

    // function to observe DOM mutations and reapply the removal logic
    function observeDOM() {
      const targetNode = document.body;
      const config = { childList: true, subtree: true };
      const callback = function (mutationsList) {
        for (const mutation of mutationsList) {
          if (mutation.type === 'childList') {

            // mutation in the DOM structure, so reapply the removal logic
            removeDiscordSupportLink();
          }
        }
      };

      // create an observer instance
      this.observer = new MutationObserver(callback);
      // Start observing the target node for configured mutations
      this.observer.observe(targetNode, config);
    }

    // call the removal logic
    removeDiscordSupportLink();
    // start observing DOM mutations
    observeDOM();
  },

  stop() {
    // disconnect the observer when the plugin is stopped
    if (this.observer) {
      this.observer.disconnect();
    }
  },
});