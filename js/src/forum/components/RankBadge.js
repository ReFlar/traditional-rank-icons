import Component from 'flarum/Component';
import extract from 'flarum/utils/extract';

/**
 * The `RankBadge` component represents a user rank badge, indicating some
 * status (e.g. a user is an admin).
 *
 * A badge may have the following special props:
 *
 * - `style` The style of badge this is. This will be used to give the badge a
 *   class name of `RankBadge--{style}`.
 * - `label`
 *
 * All other props will be assigned as attributes on the badge element.
 */
export default class RankBadge extends Component {
    view() {
        const attrs = Object.assign({}, this.props);
        const style = extract(attrs, 'style');
        const group = extract(attrs, 'group');

        attrs.className = `RankBadge ${style ? 'RankBadge--' + style : ''} ${attrs.className || ''}`;

        const color = group.color();
        const label = typeof attrs.label === 'undefined' ? group.nameSingular() : attrs.label;

        return (
            <span {...attrs} style={`--badge-color: ${color};`}>
                <span>{label}</span>
            </span>
        );
    }
}
