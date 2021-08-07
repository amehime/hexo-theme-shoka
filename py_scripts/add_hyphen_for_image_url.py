import sys
import os


def read_file(file_path):
    f = open(file_path, "rb")
    content = f.read().decode('utf-8')
    f.close()
    return content


def add_hyphen(file, image_content, day):
    image_list = image_content.split('\r\n')
    image_hyphen_content = "# " + file + "\r\n"
    for image in image_list:
        image_hyphen_content += "- " + str(day) + image + "\r\n"
    image_hyphen_content += "\r\n"
    return image_hyphen_content


def write_file(image_yml_file_path, image_content):
    f = open(image_yml_file_path, "ab")
    f.write(bytes(image_content, 'utf-8'))
    f.close()


def main(image_host_data_path):
    image_host_walk = os.walk(image_host_data_path + "\\image_host")
    for root, directories, files in image_host_walk:
        day = 1
        for file in files:
            image_content = read_file(root + "\\" + file)
            image_content = add_hyphen(file, image_content, day)
            write_file(image_host_data_path + "\\images.yml", image_content)
            day += 1


def usage():
    print("\nusage: python add_hyphen_for_image_url.py image_host_data_path\n\n"
          "eg:\n"
          "  python add_hyphen_for_image_url.py E:\\github\\co-neco.github.io\\source\\_data\n\n")


if __name__ == "__main__":
    if len(sys.argv) != 2:
        usage()
        sys.exit(0)
    main(sys.argv[1])
