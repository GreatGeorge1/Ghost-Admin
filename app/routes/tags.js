/* global key */
import $ from 'jquery';
import AuthenticatedRoute from 'ghost-admin/routes/authenticated';
import CurrentUserSettings from 'ghost-admin/mixins/current-user-settings';
import ShortcutsRoute from 'ghost-admin/mixins/shortcuts-route';

export default AuthenticatedRoute.extend(CurrentUserSettings, ShortcutsRoute, {

    shortcuts: null,

    init() {
        this._super(...arguments);
        this.shortcuts = {
            'up, k': 'moveUp',
            'down, j': 'moveDown',
            left: 'focusList',
            right: 'focusContent',
            c: 'newTag'
        };
    },

    // authors aren't allowed to manage tags
    beforeModel() {
        this._super(...arguments);

        return this.get('session.user')
            .then(this.transitionAuthor());
    },

    // set model to a live array so all tags are shown and created/deleted tags
    // are automatically added/removed. Also load all tags in the background,
    // pausing to show the loading spinner if no tags have been loaded yet
    model() {
        let promise = this.store.query('tag', {limit: 'all', include: 'count.posts'});
        let tags = this.store.peekAll('tag');

        if (this.store.peekAll('tag').get('length') === 0) {
            return promise.then(() => tags);
        } else {
            return tags;
        }
    },

    deactivate() {
        this._super(...arguments);
        if (!this.isDestroyed && !this.isDestroying) {
            this.send('resetShortcutsScope');
        }
    },

    actions: {
        moveUp() {
            if (this.controller.get('tagContentFocused')) {
                this.scrollContent(-1);
            } else {
                this.stepThroughTags(-1);
            }
        },

        moveDown() {
            if (this.controller.get('tagContentFocused')) {
                this.scrollContent(1);
            } else {
                this.stepThroughTags(1);
            }
        },

        focusList() {
            this.set('controller.keyboardFocus', 'tagList');
        },

        focusContent() {
            this.set('controller.keyboardFocus', 'tagContent');
        },

        newTag() {
            this.transitionTo('tags.new');
        },

        resetShortcutsScope() {
            key.setScope('default');
        }
    },

    buildRouteInfoMetadata() {
        return {
            titleToken: 'Метки'
        };
    },

    stepThroughTags(step) {
        let currentTag = this.modelFor('tags.tag');
        let tags = this.get('controller.sortedTags');
        let length = tags.get('length');

        if (currentTag && length) {
            let newPosition = tags.indexOf(currentTag) + step;

            if (newPosition >= length) {
                return;
            } else if (newPosition < 0) {
                return;
            }

            this.transitionTo('tags.tag', tags.objectAt(newPosition));
        }
    },

    scrollContent(amount) {
        let content = $('.tag-settings-pane');
        let scrolled = content.scrollTop();

        content.scrollTop(scrolled + 50 * amount);
    }
});
