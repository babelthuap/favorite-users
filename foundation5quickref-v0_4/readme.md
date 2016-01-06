# Foundation 5 Quick Reference

Thank you for purchasing my Quick Reference for the awesome Zurb Foundation 5 responsive web framework. If things are a little confusing, don't worry, I will attempt to quickly explain.

## Zencoding/Emmet Style Shorthand

[Emmet](http://www.emmet.io), formerly Zen Coding by Sergey Chikuyonok is an amazing plugin that is available for most modern text editors, including my favorite [Sublime Text](http://www.sublimetext.com). To get the most out of this quick reference you should install the plugin for your favorite browser. You can find specific instructions on the [Emmet download page](http://www.emmet.io/download)

If you are using Sublime Text it is very simple. Open the Package Manager by pressing `<cmd><shift>P` (on the mac) and type "install" until the `Package Manager : Install Package` option comes up. Select `Emmet` from the list and restart Sublime Text if required.



## Basic Emmet Usage

A simple Emmet command looks like the following:

      ul.side-nav>

The > marks the end of command and will place the cursor inside of that element. In this case it will create a `<ul class="side-nav"><ul>` and place the cursor in the middle of the tags. Lets look at a more complicated example:

  ul.side-nav>li*5>a#link$>lorem3

This expands to the following:

      <ul class="side-nav">
        <li><a href="" id="link1">Lorem ipsum dolor.</a></li>
        <li><a href="" id="link2">Vero, culpa, atque.</a></li>
        <li><a href="" id="link3">Tempore, molestias nulla?</a></li>
        <li><a href="" id="link4">Pariatur, exercitationem, sit.</a></li>
        <li><a href="" id="link5">Suscipit, repellendus, non!</a></li>
      </ul>

Pretty neat huh? This is very useful because you can write a lot of code very quickly, but better than that it will keep your nested elements closed correctly. As an added bonus it will also indent the code for you automaticly. Often we nest grids in Foundation and Emmet makes this process easy and trivial.

      .row>.large-12.columns>h1>{Welcome}^.row>.large-4.columns*3>.panel>.row>.small-6.small-centered.large-3.large-uncentered.columns>img^.small-12.large-9.columns+.small-12.large-12.columns>lorem10>

which expands to:

      <div class="row">
        <div class="large-12 columns">
          <h1>Welcome</h1>
          <div class="row">
            <div class="large-4 columns">
              <div class="panel">
                <div class="row">
                  <div class="small-6 small-centered large-3 large-uncentered columns"><img src="" alt=""></div>
                  <div class="small-12 large-9 columns"></div>
                  <div class="small-12 large-12 columns">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea, mollitia.</div>
                </div>
              </div>
            </div>
            <div class="large-4 columns">
              <div class="panel">
                <div class="row">
                  <div class="small-6 small-centered large-3 large-uncentered columns"><img src="" alt=""></div>
                  <div class="small-12 large-9 columns"></div>
                  <div class="small-12 large-12 columns">Maiores saepe culpa sequi quia perspiciatis architecto necessitatibus molestiae iste.</div>
                </div>
              </div>
            </div>
            <div class="large-4 columns">
              <div class="panel">
                <div class="row">
                  <div class="small-6 small-centered large-3 large-uncentered columns"><img src="" alt=""></div>
                  <div class="small-12 large-9 columns"></div>
                  <div class="small-12 large-12 columns">Assumenda, sapiente, laborum inventore corrupti rem a animi vero possimus.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

If this seems ridiculous, I assure you it is. I never in practice build out things in such a verbose way. I work from the outside in in short bursts like so:

step 1:

      .row>.large-12.columns>h1>[tab]


      <div class="row">
        <div class="large-12 columns">
          <h1>Header[added by hand]</h1>
            .row>.large-4.columns*3>.panel>[tab, then undo]
        </div>
      </div>

      <div class="row">
        <div class="large-12 columns">
          <h1>Header[added by hand]</h1>
            .row>.large-4.columns*3>.panel>.row>.small-6.small-centered.large-3.large-uncentered.columns>img>[tab, then undo]
        </div>
      </div>

So on and so forth. If you want to learn more about how I use Emmet and Foundation together to create rapid iterations check out the video that is included with this product.


## Emmet Shorthand as used in the Quick Reference

So there is one minor difference from the basic Emmet commands that is used on the Quick Reference. To improve clarity and to show heirarchy there a couple of minor differences.

      .row
        .large-12.columns
      .row
        .large-4.columns
        .large-8.columns

Tabs for heirarchy. So the way to think about this is that it is the equivilant of

      .row>.large-12.columns^.row>.large-4.columns+.large-8.columns>

      <div class="row">
        <div class="large-12 columns"></div>
      </div>
      <div class="row">
        <div class="large-4 columns"></div>
        <div class="large-8 columns"></div>
      </div>

Of course this could be handled a couple of other ways in Emmet. The key is to understanding the hierarchy of the html tags and their relationship in Emmet.

closes tag and

      > starts inside of tag
      + starts after last tag
      ^ goes up one level
      ^^ goes up two levels
      ^^^ goes up 3 levels, etc.

when used inside a tag

      *3 repeates elements 3 times, including all nested tags that follow
      $ gives a number, 1,2,3... etc. when repeated as above

Another example is the + that follows a line. This marks the continuation of the Emmet tag to increase readability. For example:

      .ul +
        .small-block-grid-2 +
        .large-block-grid-5

This could be read as:

      .ul.small-block-grid-2.large-block-grid-5

And expands to:

      <div class="ul small-block-grid-2 large-block-grid-5"></div>

Finally, in some cases some elements use data attributes. These don't translate well to Emmet but are not used frequently or could be added easily later after building out your basic structure. In these cases the full html will be listed.

## In Conclusion

These are some of the most frequently used patterns in designing sites with Zurb Foundation 5 and I hope they are as useful for you as they are for me. Good luck and happy coding.

## Changelog

0.4 Added Quick Reference for Zurb Foundation 5. Updated documents to reflect this change. Minor text and formatting changes.