FROM debian:bullseye-slim

##################################################
# Install Dwarf Fortress                         #
# -> http://www.bay12games.com/dwarves/          #
##################################################

WORKDIR /df
RUN sed -i -e's/ main/ main non-free/g' /etc/apt/sources.list
RUN apt-get update
RUN apt-get install -y libncursesw5
WORKDIR /df
ADD http://www.bay12games.com/dwarves/df_47_05_linux.tar.bz2 .
RUN tar -xf df_47_05_linux.tar.bz2
RUN mv df_linux/libs/libstdc++.so.6 df_linux/libs/xxxxlibstdc++.so.6
ADD init.txt df_linux/data/init


##################################################
# Install Dfhack                                 #
# -> https://docs.dfhack.org/                    #
##################################################

WORKDIR /df
ADD https://github.com/DFHack/dfhack/releases/download/0.47.05-r3/dfhack-0.47.05-r3-Linux-64bit-gcc-7.tar.bz2 .
RUN apt-get install bzip2
RUN tar -xf dfhack-0.47.05-r3-Linux-64bit-gcc-7.tar.bz2 --one-top-level
RUN cp -r dfhack-0.47.05-r3-Linux-64bit-gcc-7/* df_linux/


##################################################
# Install the Turbo web server                   #
# -> https://turbo.readthedocs.io/en/latest/     #
##################################################

RUN apt-get install -y luajit
RUN apt-get install -y luarocks
RUN apt-get install -y git
RUN apt-get install -y build-essential
RUN apt-get install -y libssl-dev
RUN luarocks install turbo
RUN apt-get install -y procps


##################################################
# Start the web server                           #
##################################################

WORKDIR /server
ENTRYPOINT turbovisor main.lua
