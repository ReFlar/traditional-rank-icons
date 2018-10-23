import { extend, override } from 'flarum/extend';
import User from 'flarum/models/User';
import ItemList from 'flarum/utils/ItemList';
import listItems from 'flarum/helpers/listItems';
import UserCard from 'flarum/components/UserCard';
import PostUser from 'flarum/components/PostUser';

import RankBadge from './components/RankBadge';

const get = (from, ...selectors) =>
    [...selectors].map(s =>
        s
            .replace(/\[([^\[\]]*)\]/g, '.$1.')
            .split('.')
            .filter(t => t !== '')
            .reduce((prev, cur) => prev && prev[cur], from)
    );

app.initializers.add('reflar/traditional-rank-icons', () => {
    override(User.prototype, 'badges', function() {
        const items = new ItemList();
        const groups = this.groups();

        groups.forEach(group => {
            items.add(`group${group.id()}`, RankBadge.component({ group }));
        });

        return items;
    });

    extend(UserCard.prototype, 'view', function(view) {
        const user = this.props.user;
        const badges = user.badges().toArray();

        if (!badges.length) return view;

        const container = get(view, 'children[0].children[0]')[0];
        const profile = container && container.children.find(i => i.attrs && i.attrs.className === 'UserCard-profile');

        if (!container || !profile) return view;

        profile.children = profile.children.map(i => {
            const { className } = i.attrs || {};

            if (className === 'UserCard-badges badges') return null;
            if (className === 'UserCard-identity') {
                const els = [
                    <ul className="UserCard-badges badges">{listItems(badges)}</ul>,
                    <span className="username">{user && user.displayName()}</span>,
                ];

                if (i.children[0].tag === 'a') {
                    console.log(i.children[0]);
                    i.children[0].children[1] = els;
                } else {
                    i.children[1] = els;
                }
            }

            return i;
        });

        return view;
    });

    extend(PostUser.prototype, 'view', function(view) {
        const badges = this.props.post.user().badges().toArray();

        if (!badges.length) return view;

        view.children = view.children.filter(i => !i.attrs || i.attrs.className !== 'PostUser-badges badges');

        const heading = view.children[0];
        const link = heading && heading.children.find(Boolean);
        const username = link && link.children[2];

        if (!username) return view;

        link.children.splice(1, 0,
            <ul className="PostUser-badges badges">{listItems(badges)}</ul>
        );
        return view;
    });
});
