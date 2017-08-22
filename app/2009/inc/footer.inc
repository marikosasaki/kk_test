	<ul class="list-information footer-link">
		[% IF page != 'intro' %]
			<li>
				<a href="[% euri_for('event_intro') %]" data-mbgaui-anchors="">遊び方</a>
			</li> 
		[% END %]
		[% IF page != 'prize' %]
			<li>
				<a href="[% euri_for('event_prize') %]" data-mbgaui-anchors="">報酬一覧</a>
			</li> 
		[% END %]	
		[% IF page != 'help' %]
			<li>
				<a href="[% euri_for('event_help') %]" data-mbgaui-anchors="">[% er.get('title') %] 詳細</a>
			</li> 
		[% END %]
		[% IF page != 'top' %]
		<li>
			<a href="[% euri_for('event') %]" data-mbgaui-anchors="">[% er.get('title') %] TOP</a>
		</li> 
		[% END %]
	</ul>