<div class="wrapper-event-inner parent-event-bunner">
	[%- IF has_entried -%]
		<a href="[% euri_for('event') %]" class="banner-partner" data-mbgaui-anchors>
			[%- IF can_clear_quest -%]
				<div class="clear-text">指令達成!!</div>
			[%- END -%]
			<img src="[% estatic_file('banner_partner.jpg') %]" width="320" alt="">
		</a>
	[%- ELSE -%]
		<a href="[% euri_for('event_intro') %]" class="banner-partner" data-mbgaui-anchors>
			<img src="[% estatic_file('banner_partner.jpg') %]" width="320" alt="">
		</a>
	[% END %]
</div>


