require 'fileutils'

$file_content = ''
$output_name  = 'Ramu.js'

$core = [
	File.join('core', 'header.js'),
	File.join('utils', 'keyCode.js'),
	File.join('utils', 'rect.js'),
	File.join('core', 'ramu', 'declaration.js'),
	File.join('core', 'ramu', 'init.js'),
	File.join('core', 'ramu', 'input.js'),
	File.join('core', 'ramu', 'loop.js'),
	File.join('core', 'ramu', 'engine.js'),
	File.join('utils', 'math.js'),
	File.join('utils', 'utils.js'),
	# File.join('core', 'ramu', 'destroy.js'), TODO
	File.join('core', 'gameObject.js'),
	File.join('core', 'drawable.js'),
	File.join('core', 'collisor.js')
	
]

$complete = [
	File.join('collision', 'simpleRectCollisor.js'),
	File.join('collision', 'raycast.js'),
	File.join('sprite', 'sprite.js'),
	File.join('sprite', 'spritesheet.js'),
	File.join('sprite', 'animation', 'spriteAnimation.js'),
	File.join('sprite', 'animation', 'spritesheetAnimation.js'),
	File.join('sprite', 'animation', 'SpritesheetAnimator.js'),
	File.join('event', 'mouse', 'clickable.js'),
	File.join('event', 'mouse', 'simpleSpriteButton.js')
]

$other = [
	File.join('other', 'ramuAudio.js'),
	File.join('other', 'parallax.js'),
	File.join('other', 'text.js'),
	File.join('other', 'simpleParticle.js')
]

def get_file_text file
	if File.exist?(file)
		File::open(file, 'r') { |a| return a.read}
	end
end

def create_file
	if $file_content == ''
		puts "\nNo mount command found"
		exit(0)
	end
	File::open($output_name, 'w') { |a| a.write($file_content) }
end

def assembly_core
	$core.each { |s| $file_content += get_file_text(s) + "\n" }
end

def assembly_complete
	$complete.each { |s| $file_content += get_file_text(s) + "\n" }
end

def assembly_other
	$other.each { |s| $file_content += get_file_text(s) + "\n" }
end

def assembly_module
	all = [].concat($core).concat($complete).concat($other)
	index = ARGV.index('-module') + 1
	
	if ARGV[index] == nil
		puts "\nCannot mount a file with no modules"
		exit(0)
	end
	
	modules = ARGV[index].split(',')
	modules.each do |mod|
		all.each do |item|
			if File.basename(item) == mod + '.js'
				index = all.index(item)
				$file_content += get_file_text(all[index]) + "\n"
			end
		end
	end	
end

def command_file
	index = ARGV.index('-file') + 1
	
	if ARGV[index] == nil
		puts "\nCannot mount a file with no name"
		exit(0)
	end
	
	$output_name = ARGV[index] + '.js'
end

def command cmd
	case cmd
	when '-core'
		assembly_core
	when '-complete'
		assembly_core
		assembly_complete
	when '-other'
		assembly_core
		assembly_complete
		assembly_other
	when '-module'
		assembly_module
	when '-file'
		command_file
	end
end

def print_help
	puts "\n"
	puts "\nTo mount type:"
	puts "\n\t-core to add just the minimum scripts to make it work"
	puts "\t-complete to add the default sprite and collision scripts"
	puts "\t-other to add everything"
	puts "\t-module <filename1,filename2> to expecific modules"
	puts "\n"
	puts "\t-file <filename> (optional) new file name"
end

def main
	print "Moroboshi - Ramu's File Mounting Utility"
	
	if ARGV.length > 0
		ARGV.each { |arg| command arg }
		create_file
		print ' - done.'
	else
		print_help
	end
end

main
