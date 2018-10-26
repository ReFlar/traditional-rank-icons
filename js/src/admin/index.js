import SettingsModal from '@fof/components/admin/settings/SettingsModal';
import SelectItem from '@fof/components/admin/settings/items/SelectItem';

app.initializers.add('reflar/traditional-rank-icons', () => {
    const options = {
        default: 'Default',
        filled: 'Filled',
        custom: 'Custom',
    };
    const style = () => `--badge-color: ${app.forum.attribute('themePrimaryColor')};`;

    app.extensionSettings['reflar-traditional-rank-icons'] = () =>
        app.modal.show(
            new SettingsModal({
                title: 'ReFlar Traditional Rank Icons',
                form: [
                    <div className="Form-group">
                        <label>Badge Style</label>
                        <SelectItem key={'reflar-traditional-rank-icons.style'} options={options} default={'default'} />

                        <br/><br/>
                        <p>
                            Styles: &nbsp;
                            <span className={`RankBadge RankBadge--default`} style={style()}><span>Default</span></span>
                            <span className={`RankBadge RankBadge--filled`} style={style()}><span>Filled</span></span>
                        </p>
                    </div>,
                ],
            })
        );
});
