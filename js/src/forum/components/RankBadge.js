import Component from 'flarum/Component';
import extract from 'flarum/utils/extract';

/**
 * The `Badge` component represents a user/discussion badge, indicating some
 * status (e.g. a discussion is stickied, a user is an admin).
 *
 * A badge may have the following special props:
 *
 * - `type` The type of badge this is. This will be used to give the badge a
 *   class name of `Badge--{type}`.
 * - `icon` The name of an icon to show inside the badge.
 * - `label`
 *
 * All other props will be assigned as attributes on the badge element.
 */
export default class RankBadge extends Component {
    view() {
        const attrs = Object.assign({}, this.props);
        const type = extract(attrs, 'type');
        const group = extract(attrs, 'group');

        attrs.className = 'RankBadge ' + (type ? 'RankBadge--' + type : '') + ' ' + (attrs.className || '');

        const color = group.color();
        const label = typeof attrs.label === 'undefined' ? group.nameSingular() : attrs.label;

        return (
            <span {...attrs} style={`--badge-color: ${color}`}>
                {label}
            </span>
        );
    }
}
