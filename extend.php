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

return [
    (new Extend\Frontend('forum'))
        ->js(__DIR__.'/js/dist/forum.js')
        ->css(__DIR__.'/resources/less/forum.less'),
];