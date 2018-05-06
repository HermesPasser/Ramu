require 'fileutils'

$file_content = ''
$output_name  = 'Ramu.js'

$core = [
	File.join('core', 'constants.js'),
	File.join('utils', 'keyCode.js'),
	File.join('utils', 'rect.js'),
	File.join('utils', 'math.js'),
	File.join('utils', 'utils.js'),
	File.join('core', 'engine.js'),
	File.join('core', 'object.js'),
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
	File.join('sprite', 'animation', 'SpritesheetAnimator.js')
]

$other = [
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
	File::open($output_name, 'w') { |a| a.write($file_content)}
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

def main
	print "Moroboshi - Ramu's File Mounting Utility"
	$output_name = ARGV[1] == nil ? $output_name : ARGV[1]
	
	case ARGV[0]
	when "-core"
		assembly_core
	when "-complete"
		assembly_core
		assembly_complete
	when "-other"
		assembly_core
		assembly_complete
		assembly_other
	else	
		puts "\n\t-core to add just the minimum scripts to make it work"
		puts "\t-complete to add the default sprite and collision scripts"
		puts "\t-other to add everything"
		puts "\t-<filename> (optional) new file name"
		exit(0)
	end
	create_file
	print ' - done.'
end

main
