%% # HOW TO USE
%% # INCLUDE 'sp/inc/prize.inc' with prize=prize content=content
%% #

%% id   = content.content_id;
%% num  = content.content_num;
%% type = content.content_type;
%% item_map = prize.item_map;
%% dress_map = prize.dress_map;
%% belt_map = prize.belt_map;
%% mbga_avatar_map = prize.mbga_avatar_map;

%% SWITCH type
%% CASE conf.object_type_of('item')
	%% # =========== item ===============
	%% item = prize.item_of(content.content_id);

		[% IF battle_result %]
			[% # イベントバトル結果ページ用 %]
			[% item.item_name %][% IF content.content_num > 0 %]×[% content.content_num %][% END %]
		[% ELSE %]

			<a href="_kaito_itm?i=[% item.id %]">[% item.item_name | h2z %]</a>[% IF content.content_num > 0 %]×[% content.content_num %][% END %]
		[% END %]

%% CASE conf.object_type_of('volatile_item')
        %% # =========== item ===============
        %% volatile_item = prize.volatile_item_of(content.content_id);

	        [% volatile_item.name | h2z %][% IF content.content_num > 0 %]×[% content.content_num %][% END %]

%% CASE conf.object_type_of('henchman')
	%% # HENCHMAN

	手下×[% content.content_num %]

%% CASE conf.object_type_of('dress')
	%% # AVATAR


		[% dress_map.${id}.name | h2z %]

%% CASE conf.object_type_of('belt')
	%% # EMBLEM

		エンブレム<br>[% belt_map.${id}.name | h2z %]

%% CASE conf.object_type_of('avatar')
	%% #　モバゲーアバター


		<div class="flex ml10">[% mbga_avatar_map.${id}.item_title | h2z %]</div>
%% CASE conf.object_type_of('skill')
	%% # SKILL
	%% skill = prize.skill_of(id);
		<div class="prize_box">
			<img src="[% static_file('skill/' _ skill.id _ '.png' ) %]" width="54" height="54">
			[% IF skill.has_bonus %]<span class="tk_icon">特効</span>[% END %]
		</div>
		<div class="flex ml10">
			スキル:[% skill.name | h2z %]×[% content.content_num %]<br />
			<span class="font11">[% skill.description | h2z %]</span>
		</div>
%% CASE conf.object_type_of('mocha_stamp')

	特別スタンプ

%% CASE conf.object_type_of('stone')

	[% r.get('stone_id_name' , content.content_id) %][% r.get('stone_name') %]×[% content.content_num %]
%% END
