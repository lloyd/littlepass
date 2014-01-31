**Note:** This is an experiment.

## Passwords for little ones

This is an experiment into helping little ones choose better passwords.

Because most computer users repeatedly demonstrate that they [choose terrible passwords][], what is the best we can do to help the next generation do a little better?

It seems like we've tried a hundred times *educating* the masses, and the results are unsatisfying.
I don't think there's a nice clean answer how people will become safer online.

Likely it will be a combination of things:
higher visibility password compromise which will scare people,
greater usage of federated identity which will reduce the number of passwords,
increased use of password managers which will further reduces this number,
better password hygiene by service providers which reduces the required complexity of a good password,
and perhaps widespread adoption of password alternatives which rely on multiple authentication factors.

While we wait for the safer and easier world of tomorrow, maybe we can start by educating our little ones on how to cope with the world of today?

This project, inspired by [dinopass][], is an experiment toward helping little ones choose better passwords.

 [choose terrible passwords]: https://xato.net/passwords/more-top-worst-passwords/
 [dinopass]: http://http://www.dinopass.com/

## Usage

`littlepass` is a command line password generator.  You use it like this:

    $ littlepass
    enter89water

It generates passwords intended to be reasonably secure, by combining a number and
two words.  The words are intended to be taken from a list that represents the
average vocabulary of an 8 year old (a 3rd grader).

`littlepass` is very worldly, and speaks other languages too:

    $ ./littlepass -l bg
    централен81пълен

At time of writing, it speaks 71 language, in fact.

## Using this in a product

The idea is simply, what if we design a sign up flow in products targeting little ones that goes like this:

1. The computer chooses a password for you.
2. You can accept it, or get a new one.
3. To accept it, you have to type it twice.
4. The first time you type it, it's on the screen.
5. The second time you type it, it's hidden.
6. If you can't type it twice, we start again.

This, combined with collecting a parents email, hopefully gives the child a
strong password that they have a good chance of remembering, and an easy way to reset it if they forget.  Combined with key stretching we probably end up with a system that is far more secure than most of the sites on the internet today.

Will it ever work?

## Security of Generated Passwords?

For the english list, there are 3648 words, two are chosen, and a two digit number with
90 possible values, placed at either the beginning, middle, or end.

That's 3,593,134,080 possible passwords.  and `log<sub>2</sub>(3593134080)` is ~31 bits of entropy.  With great online brute force mitigation, and 1s of server-side key-stretching and random per-user salt... An online attacker is out of luck, and an attackers who can capture your server must invest 114 years to have a 100% probability of uncovering a user's password.

I think this is safe enough for my 7 year old daughter.  You?

## Contributing

This is just an experiment, it needs many things:

0. Better Wordlists!  This system is only as good as its wordlists.  If you
   have a good idea how to get a large set of words appropriate for 8 year olds,
   please offer a better wordlist for the language which you speak!
1. Testing - Do carefully constructed machine generated passwords work for kids?
2. UX - It'd be awesome if a fantastic flow came along with this tool that showed
   us a great way to integrate it into products.  It'd be even better if that was
   a flow that was tested on little ones.
3. Cryptanalysis - The hypothesis is that ~32 bits of entropy combined with strong
   password handling gives us a good balance between usability and protection for
   kids.  It'd be nice to get some deeper analysis of the security of the system.

## The Initial Wordlists

Ideally, considerable care would be put into crafting wordlists containing words
that kids just getting started with computers can recognize and type.  To start,
I took several wordlists online for 3rd graders, and combined them with words from
the english translation of The Little Prince (starting with the little prince gives
the project soul, and seems like a reasonable start).  This resulted in a wordlist
of 3600 entries.  Finally, I used google's translation API (and 40 USD) to generate
automatic translations into 70 more languages.

This is far from optimal, but its a start!

## License

Wordlists and code are covered by the ISC license.

## Credits

[dinopass][] for initial inspiration.

For the initial wordlist: The Little Prince, Voice of America's "Special English" word list, [manythings.org][http://www.manythings.org] and [k12reader.com][http://www.k12reader.com].
