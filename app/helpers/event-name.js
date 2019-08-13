import {helper} from '@ember/component/helper';

export const AVAILABLE_EVENTS = [
    // GROUPNAME: Global
    {event: 'site.changed', name: 'Site changed (rebuild)', group: 'Global'},

    // GROUPNAME: Новости
    {event: 'post.added', name: 'Post created', group: 'Новости'},
    {event: 'post.deleted', name: 'Post deleted', group: 'Новости'},
    {event: 'post.edited', name: 'Post updated', group: 'Новости'},
    {event: 'post.published', name: 'Post published', group: 'Новости'},
    {event: 'post.published.edited', name: 'Published post updated', group: 'Новости'},
    {event: 'post.unpublished', name: 'Post unpublished', group: 'Новости'},
    {event: 'post.tag.attached', name: 'Tag added to post', group: 'Новости'},
    {event: 'post.tag.detached', name: 'Tag removed from post', group: 'Новости'},

    // GROUPNAME: Страницы
    {event: 'page.added', name: 'Page created', group: 'Страницы'},
    {event: 'page.deleted', name: 'Page deleted', group: 'Страницы'},
    {event: 'page.edited', name: 'Page updated', group: 'Страницы'},
    {event: 'page.published', name: 'Page published', group: 'Страницы'},
    {event: 'page.published.edited', name: 'Published page updated', group: 'Страницы'},
    {event: 'page.unpublished', name: 'Page unpublished', group: 'Страницы'},
    {event: 'page.tag.attached', name: 'Tag added to page', group: 'Страницы'},
    {event: 'page.tag.detached', name: 'Tag removed from page', group: 'Страницы'},

    // GROUPNAME: Метки
    {event: 'tag.added', name: 'Tag created', group: 'Метки'},
    {event: 'tag.edited', name: 'Tag updated', group: 'Метки'},
    {event: 'tag.deleted', name: 'Tag deleted', group: 'Метки'},

    // GROUPNAME: Subscribers
    {event: 'subscriber.added', name: 'Subscriber added', group: 'Subscribers'},
    {event: 'subscriber.deleted', name: 'Subscriber deleted', group: 'Subscribers'}
];

export function eventName([event]/*, hash*/) {
    let match = AVAILABLE_EVENTS.findBy('event', event);

    return match ? match.name : event;
}

export default helper(eventName);
