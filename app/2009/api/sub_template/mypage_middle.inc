<div class="wrapper-event-inner" style="background-color:#003b6f;">
	<ul class="list-information event-information-bg" style="background-image:url([% estatic_file('event_tab.png') %]);">
		<li class="include-btn">
			[%- IF has_entried -%]
				[%- IF can_clear_quest -%]
					<div class="clear-quest-stamp" style="background-image:url([% estatic_file('icon_clear.png') %]);" ></div>
				[%- END -%]

				<a href="[% euri_for('event') %]" class="btn-style" data-mbgaui-anchors>イベントTOPへ</a>
			[%- ELSE -%]
				<a href="[% euri_for('event_intro') %]" class="btn-style" data-mbgaui-anchors>イベントTOPへ</a>
			[% END %]
			<span class="event-day-text">[% date_mmdd_youbi_hhmm('%d/%d(%s)%02d:%02d', econf.opened_at) %]-[% date_mmdd_youbi_hhmm('%d/%d(%s)%02d:%02d', econf.closed_at_for_view - 1) %]</span>
		</li>
	</ul>
</div>
