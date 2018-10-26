<?php

/**
 *  This file is part of reflar/traditional-rank-icons.
 *
 *  Copyright (c) 2018 ReFlar.
 *
 *  For the full copyright and license information, please view the LICENSE.md
 *  file that was distributed with this source code.
 */

namespace Reflar\TraditionalRankIcons;

use Flarum\Extend;
use Flarum\Frontend\HtmlDocument;

return [
    (new Extend\Frontend('forum'))
        ->js(__DIR__.'/js/dist/forum.js')
        ->css(__DIR__ . '/resources/less/forum.less')
        ->css(__DIR__ . '/resources/less/common.less')
        ->content(function (HtmlDocument $document) {
            $key = 'reflar-traditional-rank-icons.style';
            $document->payload[$key] = app('flarum.settings')->get($key);
        }),
    (new Extend\Frontend('admin'))
        ->js(__DIR__.'/js/dist/admin.js')
        ->css(__DIR__ . '/resources/less/common.less'),
];
